package com.finnegans.gestioncrisalis.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "CLIENTES")

public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "ELIMINADO", nullable = false, columnDefinition = "boolean default false")
    private boolean eliminado;


    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;

    //RELACIÓN CON PERSONA M:1
    // clase cliente puede tener una persona nomas (Descomentar cuando se tenga la clase persona)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PERSONA_ID", nullable = false)
    private Persona persona;

    //RELACIÓN CON EMPRESA M:1
    //Esta clase cliente puede tener una empresa nomas (Descomentar cuando se tenga la clase empresa)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "EMPRESA_ID")
    private Empresa empresa;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "cliente"
    )
    @JsonIgnore
    private List<Orden> ordenes;

    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }

}
