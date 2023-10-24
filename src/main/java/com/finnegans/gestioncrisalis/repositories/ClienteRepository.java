package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
