package com.example.back_end.repos;

import com.example.back_end.models.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Custom methods can be defined here if needed
    Category findById(int id);
    Category findByCategoryName(String name);

}
