package br.pucgo.clienteservice.service;

import br.pucgo.clienteservice.model.Cliente;
import br.pucgo.clienteservice.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository){
        this.repository = repository;
    }

    public List<Cliente> listar(){
        return repository.findAll();
    }

    public Cliente buscar(Long id){
        return repository.findById(id).orElse(null);
    }

    public Cliente salvar(Cliente cliente){
        return repository.save(cliente);
    }

    public Cliente atualizar(Long id, Cliente cliente){

        Cliente existente = buscar(id);

        existente.setNome(cliente.getNome());
        existente.setTelefone(cliente.getTelefone());
        existente.setEmail(cliente.getEmail());

        return repository.save(existente);

    }

    public void excluir(Long id){
        repository.deleteById(id);
    }

}