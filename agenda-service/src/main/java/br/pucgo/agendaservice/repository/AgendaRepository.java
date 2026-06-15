package br.pucgo.agendaservice.repository;

import br.pucgo.agendaservice.model.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {
}