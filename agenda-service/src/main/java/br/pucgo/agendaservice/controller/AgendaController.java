package br.pucgo.agendaservice.controller;

import br.pucgo.agendaservice.model.Agenda;
import br.pucgo.agendaservice.service.AgendaService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendas")
public class AgendaController {

    private final AgendaService service;

    public AgendaController(AgendaService service){
        this.service = service;
    }

    @GetMapping
    public List<Agenda> listar(){
        return service.listar();
    }

    @GetMapping("/{id}")
    public Agenda buscar(@PathVariable Long id){
        return service.buscar(id);
    }

    @PostMapping
    public Agenda salvar(@Valid @RequestBody Agenda agenda){
        return service.salvar(agenda);
    }

    @PutMapping("/{id}")
    public Agenda atualizar(@PathVariable Long id,
                            @RequestBody Agenda agenda){
        return service.atualizar(id, agenda);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        service.excluir(id);
    }

}