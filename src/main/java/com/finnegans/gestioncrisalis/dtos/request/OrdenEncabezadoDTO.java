package com.finnegans.gestioncrisalis.dtos.request;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor  // Lombok annotation to create a no-args constructor
public class OrdenEncabezadoDTO {
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime fechaCreacion;
    private String persona;
    private String empresa;
    private Long cantProds;
    private Long cantServs;
    private Double total;
    private Boolean anulado;
    private int[] prods_servs;  // This will be set separately, not through constructor

    // Manually created constructor matching the JPQL query result
    public OrdenEncabezadoDTO(Long id, LocalDateTime fechaCreacion, String persona, String empresa,
                              Long cantProds, Long cantServs, Double total, Boolean anulado) {
        this.id = id;
        this.fechaCreacion = fechaCreacion;
        this.persona = persona;
        this.empresa = empresa;
        this.cantProds = cantProds;
        this.cantServs = cantServs;
        this.total = total;
        this.anulado = anulado;
    }

    // Setter for prods_servs remains unchanged
    public void setProdsServs(int[] prodsServs) {
        this.prods_servs = prodsServs;
    }
}
