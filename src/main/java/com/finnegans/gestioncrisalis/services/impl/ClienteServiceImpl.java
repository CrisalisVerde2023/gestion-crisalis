package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.ClienteDTO;
import com.finnegans.gestioncrisalis.dtos.mappers.ClienteDTOMapper;
import com.finnegans.gestioncrisalis.dtos.request.ClienteResponseDTO;
import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.models.Empresa;
import com.finnegans.gestioncrisalis.models.Persona;
import com.finnegans.gestioncrisalis.repositories.ClienteRepository;
import com.finnegans.gestioncrisalis.repositories.EmpresaRepository;
import com.finnegans.gestioncrisalis.repositories.PersonaRepository;
import com.finnegans.gestioncrisalis.services.ClienteService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    //SE IMPORTAN LOS REPOSITIORIOS PERO TENDRIAN QUE VENIR DEL SERVICE
    private final PersonaRepository personaRepository;
    private final EmpresaRepository empresaRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository,
                              PersonaRepository personaRepository,
                              EmpresaRepository empresaRepository) {

        this.clienteRepository = clienteRepository;
        this.personaRepository = personaRepository;
        this.empresaRepository = empresaRepository;
    }

    public boolean clienteConMismaPersonaYempresaExiste(Persona persona, Empresa empresa){
        Optional<Cliente> cliente = this.clienteRepository.findByPersonaAndEmpresa(persona, empresa);
        return cliente.isPresent();
    }

    @Override
    public ClienteResponseDTO save(ClienteDTO clienteDTO) {

        Persona persona = this.personaRepository.findById(clienteDTO.getPersonaIdDTO())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        if(clienteDTO.getEmpresaIdDTO() == null){

            if(clienteConMismaPersonaYempresaExiste(persona, null)){
                throw new RuntimeException("Ya existe un cliente de tipo persona");
            }

            System.out.println("Este cliente es de tipo persona");
            Cliente cliente = this.clienteRepository.save(
                    Cliente.builder()
                            .persona(persona)
                            .empresa(null)
                            .build()
            );

            return ClienteDTOMapper.builder().setCliente(cliente).build();
        }

        Empresa empresa = this.empresaRepository.findById(clienteDTO.getEmpresaIdDTO())
                    .orElseThrow(() -> new RuntimeException("Empresa no encontrada"));

        if(clienteConMismaPersonaYempresaExiste(persona, empresa)){
            throw new RuntimeException("Ya existe un cliente de tipo empresa");
        }

        System.out.println("Este cliente es de tipo empresa");
        Cliente cliente = this.clienteRepository.save(
                Cliente.builder()
                        .persona(persona)
                        .empresa(empresa)
                        .build()
        );

        return ClienteDTOMapper.builder().setCliente(cliente).build();
    }

}
