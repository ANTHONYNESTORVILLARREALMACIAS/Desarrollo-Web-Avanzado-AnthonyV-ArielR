package com.tiendavirtual.backend.service;

import com.tiendavirtual.backend.dto.CategoryDTO;
import com.tiendavirtual.backend.exception.ResourceNotFoundException;
import com.tiendavirtual.backend.model.Category;
import com.tiendavirtual.backend.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        if(categoryRepository.existsByName((categoryDTO.getName()))) {
            throw new RuntimeException("Categoría ya existe");
        }

        Category category = modelMapper.map(categoryDTO, Category.class);
        category = categoryRepository.save(category);
        return modelMapper.map(category, CategoryDTO.class);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));

        if(!category.getName().equals(categoryDTO.getName()) &&
                categoryRepository.existsByName(categoryDTO.getName())) {
            throw new RuntimeException("Nombre de categoría ya existe");
        }

        modelMapper.map(categoryDTO, category);
        category = categoryRepository.save(category);
        return modelMapper.map(category, CategoryDTO.class);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
        categoryRepository.delete(category);
    }
}
