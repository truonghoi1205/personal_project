package com.codegym.personalprojectbe.repository;

import com.codegym.personalprojectbe.dto.GetNumberOfRole;
import com.codegym.personalprojectbe.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IRoleRepository extends JpaRepository<Role,Long> {
    @Query(nativeQuery = true, value = "select name, count(account_id) as number from roles left join security1.accounts_roles ar on roles.id = ar.roles_id group by name;\n")

    Iterable<GetNumberOfRole> getAllNumberOfRole();

    Role findByName(String name);
}
