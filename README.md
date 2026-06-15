# salao-beleza-microsservicos
Tema: Sistema de Salão de Beleza.
Descrição: aplicação distribuída composta por dois microsserviços (cliente-service e agenda-service).
Tecnologias: Java, Spring Boot, Spring Data JPA, MySQL, Swagger e Maven.
Portas utilizadas:
cliente-service: 8081
agenda-service: 8082
Como executar: iniciar o MySQL, criar os bancos cliente_db e agenda_db, configurar o application.properties com usuário e senha, e executar os dois projetos.
Principais endpoints: liste os CRUDs de /clientes e /agendas.
Comunicação entre os serviços: explique que, ao criar uma agenda, o agenda-service consulta o cliente-service para verificar se o cliente existe antes de salvar.
