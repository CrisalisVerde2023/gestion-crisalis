package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
}
