package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface INotificationRepository extends JpaRepository<Notification, Long> {
}
