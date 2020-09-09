USE WebsiteDaSaude
GO

INSERT INTO Permissoes 
	VALUES	('Comum'),
			('Administrador')
GO


INSERT INTO Bairros 
	VALUES	('Água Vermelha'),
			('Biritiba'),
			('Calmon Viana'),
			('Centro'),
			('Chácara Bela Vista'),
			('Cidade Kemel'),
			('Conjunto Alvorada'),
			('Conjunto Residencial Bela Vista'),
			('Jardim Amélia'),
			('Jardim América'),
			('Jardim Antônio Picosse'),
			('Jardim Áurea'),
			('Jardim Beatriz'),
			('Jardim Bela Vista'),
			('Jardim Cândida'),
			('Jardim Dom Manoel'),
			('Jardim Débora'),
			('Jardim Dulce'),
			('Jardim Emília'),
			('Jardim Estela'),
			('Jardim Indaiá'),
			('Jardim Itamarati'),
			('Jardim Ivone'),
			('Jardim Ivonete'),
			('Jardim Julieta'),
			('Jardim Madre Ângela'),
			('Jardim Medina'),
			('Jardim Nova Poá'),
			('Jardim Obelisco'),
			('Jardim Odete'),
			('Jardim Pereta'),
			('Jardim Perracini'),
			('Jardim Pinheiro'),
			('Jardim Ruth'),
			('Jardim Santa Helena'),
			('Jardim Santa Luíza'),
			('Jardim Santa Maria'),
			('Jardim São José'),
			('Jardim São Marcos'),
			('Jardim Selma Helena'),
			('Jardim Tamandaré'),
			('Jardim Tereza Palma'),
			('Jardim Violeta'),
			('Vila Açoreana'),
			('Vila Amélia'),
			('Vila Anchieta'),
			('Vila Anita'),
			('Vila Ararat'),
			('Vila Arbame'),
			('Vila Arquimedes'),
			('Vila Áurea'),
			('Vila Atui'),
			('Vila Bandeirantes'),
			('Vila Cosmos'),
			('Vila Cristelo'),
			('Vila das Acácias'),
			('Vila das Rosas'),
			('Vila Eureka'),
			('Vila Gonçalves'),
			('Vila Ibar'),
			('Vila Idalina'),
			('Vila Jaú'),
			('Vila Júlia'),
			('Vila Lúcia'),
			('Vila Monteiro'),
			('Vila Oceania'),
			('Vila Odete'),
			('Vila Pereta'),
			('Vila Perracini'),
			('Vila Perreli'),
			('Vila Rea'),
			('Vila Romana'),
			('Vila Ruth'),
			('Vila Santa Helena'),
			('Vila Santa Luíza'),
			('Vila Santa Maria'),
			('Vila São João'),
			('Vila Sopreter'),
			('Vila Turmalina'),
			('Vila Vampre'),
			('Vila Varela')
GO


INSERT INTO TiposLocais 
	VALUES	('Hospital'),
			('UPA'),
			('UBS'),
			('USF'),
			('Outro')
GO

INSERT INTO Categorias
	VALUES	('Pediatria'),
			('Odontologia'),
			('Clínico Geral'),
			('Ortopedia'),
			('Traumatologia'),
			('Psicologia')
GO

INSERT INTO Situacoes (NomeSituacao,Descricao)
	VALUES	('Normal','Atendendo normalmente'),
			('Rápido','Atendimento mais rápido do que o comum'),
			('Indisponível','Serviço indisponível temporariamente'),
			('Superlotado','Atendimento irregular há mais pacientes do que o suportado'),
			('Falta de Funcionários','Atendimento irregular pois faltam funcionários da área'),
			('Falta de Recursos','Atendimento irregular devido à falta determinados recursos (leitos, medicamentos, etc.)'),
			('Demorado','Atendimento com tempo de espera maior por motivo indefinido')
GO

-- INSERIR AQUI INFORMAÇÕES DO PRIMEIRO USUÁRIO ADMINISTRADOR
INSERT INTO Usuarios (IdPermissao, NomeUsuario, DataNascimento, Email, Senha)
	VALUES	(2, 'Lucas de Souza','2002-06-20','email@email.com','123123123'),
GO

INSERT INTO Locais (IdTipoLocal,NomeLocal,IdBairro,Cep,Logradouro,Numero)
	VALUES (1,'Hospital Municipal Guido Guida',27,'08556230','Rua Barão de Juparanã',43)
GO


INSERT INTO Eventos (NomeEvento,Descricao,DataInicio,DataTermino)
	VALUES	('Campanha de vacinação contra o sarampo','Campanha para prevenir o Sarampo de se propagar pela população. Não se vacinou? vacine-se agora!',GETDATE(),'2020-03-07'),
			('Multirão contra o mosquito da dengue','Multirão para combater os aspectos favoráveis à reprodução do mosquito Aedis Aegypti. Pessoas menores de idade devem ser acompanhados por responsável legal',GETDATE(),'2020-02-29')
GO


INSERT INTO LocaisEventos (IdEvento,IdLocal)
	VALUES	(1,1),
			(2,1)
GO

INSERT INTO Servicos (IdCategoria,NomeServico)
	VALUES	(3,'Pronto Atendimento'),
			(1,'Pronto Atendimento'),
			(4,'Engessamento'),
			(3,'Medicação')
GO


INSERT INTO ServicosPrestados (IdServico,IdLocal,IdSituacao,UltimaAtualizacao)
	VALUES	(1,1,1,GETDATE()),
			(4,1,5,GETDATE())
GO
