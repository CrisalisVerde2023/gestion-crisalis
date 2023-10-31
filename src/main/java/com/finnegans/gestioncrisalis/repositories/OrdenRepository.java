package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdenRepository extends JpaRepository<Orden,Long>{
}
