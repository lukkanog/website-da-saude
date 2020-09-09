USE WebsiteDaSaude
GO

INSERT INTO Permissoes 
	VALUES	('Comum'),
			('Administrador')
GO


INSERT INTO Bairros 
	VALUES	('�gua Vermelha'),
			('Biritiba'),
			('Calmon Viana'),
			('Centro'),
			('Ch�cara Bela Vista'),
			('Cidade Kemel'),
			('Conjunto Alvorada'),
			('Conjunto Residencial Bela Vista'),
			('Jardim Am�lia'),
			('Jardim Am�rica'),
			('Jardim Ant�nio Picosse'),
			('Jardim �urea'),
			('Jardim Beatriz'),
			('Jardim Bela Vista'),
			('Jardim C�ndida'),
			('Jardim Dom Manoel'),
			('Jardim D�bora'),
			('Jardim Dulce'),
			('Jardim Em�lia'),
			('Jardim Estela'),
			('Jardim Indai�'),
			('Jardim Itamarati'),
			('Jardim Ivone'),
			('Jardim Ivonete'),
			('Jardim Julieta'),
			('Jardim Madre �ngela'),
			('Jardim Medina'),
			('Jardim Nova Po�'),
			('Jardim Obelisco'),
			('Jardim Odete'),
			('Jardim Pereta'),
			('Jardim Perracini'),
			('Jardim Pinheiro'),
			('Jardim Ruth'),
			('Jardim Santa Helena'),
			('Jardim Santa Lu�za'),
			('Jardim Santa Maria'),
			('Jardim S�o Jos�'),
			('Jardim S�o Marcos'),
			('Jardim Selma Helena'),
			('Jardim Tamandar�'),
			('Jardim Tereza Palma'),
			('Jardim Violeta'),
			('Vila A�oreana'),
			('Vila Am�lia'),
			('Vila Anchieta'),
			('Vila Anita'),
			('Vila Ararat'),
			('Vila Arbame'),
			('Vila Arquimedes'),
			('Vila �urea'),
			('Vila Atui'),
			('Vila Bandeirantes'),
			('Vila Cosmos'),
			('Vila Cristelo'),
			('Vila das Ac�cias'),
			('Vila das Rosas'),
			('Vila Eureka'),
			('Vila Gon�alves'),
			('Vila Ibar'),
			('Vila Idalina'),
			('Vila Ja�'),
			('Vila J�lia'),
			('Vila L�cia'),
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
			('Vila Santa Lu�za'),
			('Vila Santa Maria'),
			('Vila S�o Jo�o'),
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
			('Cl�nico Geral'),
			('Ortopedia'),
			('Traumatologia'),
			('Psicologia')
GO

INSERT INTO Situacoes (NomeSituacao,Descricao)
	VALUES	('Normal','Atendendo normalmente'),
			('R�pido','Atendimento mais r�pido do que o comum'),
			('Indispon�vel','Servi�o indispon�vel temporariamente'),
			('Superlotado','Atendimento irregular h� mais pacientes do que o suportado'),
			('Falta de Funcion�rios','Atendimento irregular pois faltam funcion�rios da �rea'),
			('Falta de Recursos','Atendimento irregular devido � falta determinados recursos (leitos, medicamentos, etc.)'),
			('Demorado','Atendimento com tempo de espera maior por motivo indefinido')
GO

-- INSERIR AQUI INFORMA��ES DO PRIMEIRO USU�RIO ADMINISTRADOR
INSERT INTO Usuarios (IdPermissao, NomeUsuario, DataNascimento, Email, Senha)
	VALUES	(2, 'Lucas de Souza','2002-06-20','email@email.com','123123123'),
GO

INSERT INTO Locais (IdTipoLocal,NomeLocal,IdBairro,Cep,Logradouro,Numero)
	VALUES (1,'Hospital Municipal Guido Guida',27,'08556230','Rua Bar�o de Juparan�',43)
GO


INSERT INTO Eventos (NomeEvento,Descricao,DataInicio,DataTermino)
	VALUES	('Campanha de vacina��o contra o sarampo','Campanha para prevenir o Sarampo de se propagar pela popula��o. N�o se vacinou? vacine-se agora!',GETDATE(),'2020-03-07'),
			('Multir�o contra o mosquito da dengue','Multir�o para combater os aspectos favor�veis � reprodu��o do mosquito Aedis Aegypti. Pessoas menores de idade devem ser acompanhados por respons�vel legal',GETDATE(),'2020-02-29')
GO


INSERT INTO LocaisEventos (IdEvento,IdLocal)
	VALUES	(1,1),
			(2,1)
GO

INSERT INTO Servicos (IdCategoria,NomeServico)
	VALUES	(3,'Pronto Atendimento'),
			(1,'Pronto Atendimento'),
			(4,'Engessamento'),
			(3,'Medica��o')
GO


INSERT INTO ServicosPrestados (IdServico,IdLocal,IdSituacao,UltimaAtualizacao)
	VALUES	(1,1,1,GETDATE()),
			(4,1,5,GETDATE())
GO
