package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
