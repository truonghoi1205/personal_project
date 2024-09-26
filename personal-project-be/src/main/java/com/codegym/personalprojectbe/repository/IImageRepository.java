package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IImageRepository extends JpaRepository<Image,Long> {
}
