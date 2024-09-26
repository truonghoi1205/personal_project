package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPropertyRepository extends JpaRepository<Property, Long> {
}
