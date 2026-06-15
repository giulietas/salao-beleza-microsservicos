package br.pucgo.agendaservice.service;

import br.pucgo.agendaservice.dto.ClienteDTO;
import br.pucgo.agendaservice.model.Agenda;
import br.pucgo.agendaservice.repository.AgendaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AgendaService {

    private final AgendaRepository repository;
    private final RestTemplate restTemplate;

    public AgendaService(AgendaRepository repository,
                         RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    public List<Agenda> listar() {
        return repository.findAll();
    }

    public Agenda buscar(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Agenda salvar(Agenda agenda) {

        String url = "http://localhost:8081/clientes/" + agenda.getClienteId();

        ClienteDTO cliente = restTemplate.getForObject(url, ClienteDTO.class);

        try {
            restTemplate.getForObject(url, ClienteDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Cliente não encontrado.");
        }

        return repository.save(agenda);

    }

    public Agenda atualizar(Long id, Agenda agenda) {

        Agenda existente = buscar(id);

        existente.setProcedimento(agenda.getProcedimento());
        existente.setDataHora(agenda.getDataHora());
        existente.setStatus(agenda.getStatus());
        existente.setClienteId(agenda.getClienteId());

        return repository.save(existente);

    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

}