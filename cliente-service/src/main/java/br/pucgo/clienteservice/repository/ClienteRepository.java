package br.pucgo.clienteservice.repository;

import br.pucgo.clienteservice.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {

}