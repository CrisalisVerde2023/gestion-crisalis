package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.ClienteDTO;
import com.finnegans.gestioncrisalis.dtos.mappers.ClienteDTOMapper;
import com.finnegans.gestioncrisalis.dtos.request.ClienteResponseDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.DataIntegrityException;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;

import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.models.Empresa;
import com.finnegans.gestioncrisalis.models.Persona;
import com.finnegans.gestioncrisalis.repositories.ClienteRepository;
import com.finnegans.gestioncrisalis.repositories.EmpresaRepository;
import com.finnegans.gestioncrisalis.repositories.PersonaRepository;
import com.finnegans.gestioncrisalis.services.ClienteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    //Métodos privados para usar en el servicio
    private boolean clienteConMismaPersonaYempresaExiste(Persona persona, Empresa empresa){
        Optional<Cliente> cliente = this.clienteRepository.findByPersonaAndEmpresa(persona, empresa);
        return cliente.isPresent();
    }
    //----------------------------------------

    @Override
    public ClienteResponseDTO save(ClienteDTO clienteDTO) {

        if(clienteDTO.getPersonaIdDTO() == null ) throw new DataIntegrityException("El id de la persona no puede ser nulo");
        Persona persona = this.personaRepository.findById(clienteDTO.getPersonaIdDTO())
                .orElseThrow(() -> new ResourceNotFound("Persona con id: ".concat(String.valueOf(clienteDTO.getPersonaIdDTO())).concat(" no encontrada")));
        if(clienteDTO.getEmpresaIdDTO() == null){
            if(clienteConMismaPersonaYempresaExiste(persona, null)) throw new DataIntegrityException("Ya existe un cliente de tipo persona con la misma persona");
            Cliente cliente = this.clienteRepository.save(
                    Cliente.builder()
                            .persona(persona)
                            .empresa(null)
                            .build()
            );
            return ClienteDTOMapper.builder().setCliente(cliente).build();
        }
        Empresa empresa = this.empresaRepository.findById(clienteDTO.getEmpresaIdDTO())
                    .orElseThrow(() -> new ResourceNotFound("Empresa con id: ".concat(String.valueOf(clienteDTO.getEmpresaIdDTO())).concat(" no encontrada")));
        if(clienteConMismaPersonaYempresaExiste(persona, empresa)) throw new DataIntegrityException("Ya existe un cliente de tipo empresa con la misma persona y empresa");
        Cliente cliente = this.clienteRepository.save(
                Cliente.builder()
                        .persona(persona)
                        .empresa(empresa)
                        .build()
        );
        return ClienteDTOMapper.builder().setCliente(cliente).build();
    }

    public ClienteResponseDTO getById(Long id) {
        Cliente cliente = this.clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Cliente no encontrado con id: ".concat(String.valueOf(id))));

        return ClienteDTOMapper.builder().setCliente(cliente).build();
    }

    @Override
    public List<ClienteResponseDTO> getAll() {
        List<Cliente> clientes = this.clienteRepository.findAll();

        return clientes.stream().map(
                cliente -> ClienteDTOMapper.builder().setCliente(cliente).build()
        ).collect(Collectors.toList());
    }

    @Override
    public ClienteResponseDTO update(Long id, ClienteDTO clienteDTO) {
        Cliente cliente = this.clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Cliente no encontrado con id: ".concat(String.valueOf(id))));

        if(clienteDTO.getPersonaIdDTO() != null){
            Persona persona = this.personaRepository.findById(clienteDTO.getPersonaIdDTO())
                    .orElseThrow(() -> new ResourceNotFound("Persona con id: ".concat(String.valueOf(clienteDTO.getPersonaIdDTO())).concat(" no encontrada")));
            if(clienteDTO.getEmpresaIdDTO() == null){
                if(clienteConMismaPersonaYempresaExiste(persona,null)) throw new DataIntegrityException("La persona que intenta asignar ya existe en otro cliente de tipo persona");
                cliente.setPersona(persona);
                cliente.setEmpresa(null);

            }else{
                Empresa empresa = this.empresaRepository.findById(clienteDTO.getEmpresaIdDTO())
                        .orElseThrow(() -> new ResourceNotFound("Empresa con id: ".concat(String.valueOf(clienteDTO.getEmpresaIdDTO())).concat(" no encontrada")));
                if(clienteConMismaPersonaYempresaExiste(persona, empresa)) throw new DataIntegrityException("La persona y empresa que intenta asignar ya conforman otro cliente de tipo empresa");
                cliente.setPersona(persona);
                cliente.setEmpresa(empresa);
            }
        }

        Cliente clienteSave = this.clienteRepository.save(cliente);

        return ClienteDTOMapper.builder().setCliente(clienteSave).build();
    }

    @Override
    public ClienteResponseDTO delete(Long id) {
        Cliente cliente = this.clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Cliente no encontrado con id: ".concat(String.valueOf(id))));

        cliente.setEliminado(!cliente.isEliminado());

        this.clienteRepository.save(cliente);

        return ClienteDTOMapper.builder().setCliente(cliente).build();
    }
}
