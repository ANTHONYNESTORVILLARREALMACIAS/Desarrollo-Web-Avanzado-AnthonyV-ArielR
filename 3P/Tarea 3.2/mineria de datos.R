# Cargar librerías necesarias
library(shiny)
library(ggplot2)
library(cluster)
library(factoextra)
library(corrplot)
library(caret)
library(dendextend)

# Cargar el dataset mtcars
dataset <- mtcars
dataset_numeric <- dataset[, c("mpg", "hp", "wt", "disp", "drat")]

# Normalizar los datos
normalize <- function(x) {
  return((x - min(x)) / (max(x) - min(x)))
}
dataset_scaled <- as.data.frame(lapply(dataset_numeric, normalize))

# Definir la interfaz de usuario (UI)
ui <- fluidPage(
  titlePanel("Minería de Datos en mtcars"),
  
  sidebarLayout(
    sidebarPanel(
      h4("Exploración de Datos"),
      selectInput("var_x", "Variable X:", choices = colnames(dataset_numeric), selected = "mpg"),
      selectInput("var_y", "Variable Y:", choices = colnames(dataset_numeric), selected = "hp"),
      
      h4("Agrupamiento"),
      sliderInput("num_clusters", "Número de Clusters (K):", min = 2, max = 6, value = 3),
      actionButton("run_kmeans", "Ejecutar K-Means"),
      actionButton("run_hclust", "Ejecutar Clustering Jerárquico"),
      
      h4("Análisis de Componentes Principales"),
      actionButton("run_pca", "Ejecutar PCA"),
      
      h4("Predicción con Regresión Lineal"),
      selectInput("pred_var", "Variable Objetivo:", choices = colnames(dataset_numeric), selected = "mpg"),
      actionButton("run_lm", "Ejecutar Regresión Lineal")
    ),
    
    mainPanel(
      tabsetPanel(
        tabPanel("Exploración", plotOutput("scatterPlot"), plotOutput("corPlot")),
        tabPanel("Clustering K-Means", plotOutput("kmeansPlot"), tableOutput("kmeansTable")),
        tabPanel("Clustering Jerárquico", plotOutput("hclustPlot")),
        tabPanel("PCA", plotOutput("pcaPlot")),
        tabPanel("Regresión Lineal", plotOutput("lmPlot"), verbatimTextOutput("lmSummary"))
      )
    )
  )
)

# Definir la lógica del servidor
server <- function(input, output) {
  
  # 📌 Gráfico de dispersión para explorar relaciones
  output$scatterPlot <- renderPlot({
    ggplot(dataset, aes_string(x = input$var_x, y = input$var_y)) +
      geom_point(color = "blue", size = 3) +
      theme_minimal() +
      labs(title = "Gráfico de Dispersión", x = input$var_x, y = input$var_y)
  })
  
  # 📌 Matriz de correlaciones
  output$corPlot <- renderPlot({
    corr_matrix <- cor(dataset_numeric)
    corrplot(corr_matrix, method = "color", type = "upper", tl.cex = 0.8)
  })
  
  # 📌 Clustering K-Means
  kmeans_result <- eventReactive(input$run_kmeans, {
    set.seed(123)
    kmeans(dataset_scaled, centers = input$num_clusters, nstart = 25)
  })
  
  output$kmeansPlot <- renderPlot({
    req(kmeans_result())
    fviz_cluster(kmeans_result(), data = dataset_scaled, geom = "point",
                 ellipse.type = "convex", ggtheme = theme_minimal())
  })
  
  output$kmeansTable <- renderTable({
    req(kmeans_result())
    data.frame(Car_Model = rownames(dataset), Cluster = kmeans_result()$cluster)
  })
  
  # 📌 Clustering Jerárquico
  hclust_result <- eventReactive(input$run_hclust, {
    hclust(dist(dataset_scaled), method = "ward.D2")
  })
  
  output$hclustPlot <- renderPlot({
    req(hclust_result())
    dend <- as.dendrogram(hclust_result())
    plot(dend, main = "Dendrograma Jerárquico", cex = 0.8)
  })
  
  # 📌 Análisis de Componentes Principales (PCA)
  pca_result <- eventReactive(input$run_pca, {
    prcomp(dataset_scaled, center = TRUE, scale. = TRUE)
  })
  
  output$pcaPlot <- renderPlot({
    req(pca_result())
    fviz_pca_biplot(pca_result(), repel = TRUE, col.var = "blue", col.ind = "red")
  })
  
  # 📌 Regresión Lineal
  lm_result <- eventReactive(input$run_lm, {
    formula <- as.formula(paste(input$pred_var, "~ ."))
    train(formula, data = dataset_numeric, method = "lm")
  })
  
  output$lmPlot <- renderPlot({
    req(lm_result())
    plot(lm_result()$finalModel$fitted.values, dataset_numeric[[input$pred_var]], 
         col = "blue", pch = 16, xlab = "Valores Predichos", ylab = "Valores Reales",
         main = "Regresión Lineal - Valores Reales vs. Predichos")
    abline(0, 1, col = "red", lwd = 2)
  })
  
  output$lmSummary <- renderPrint({
    req(lm_result())
    summary(lm_result()$finalModel)
  })
}

# Ejecutar la aplicación Shiny
shinyApp(ui = ui, server = server)
