package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.models.Empresa;
import com.finnegans.gestioncrisalis.models.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByPersonaAndEmpresa (Persona persona, Empresa empresa);

}
