-- ********************      DDL      ******************** 
CREATE DATABASE WebsiteDaSaude
GO

USE WebsiteDaSaude
GO

--    TABELAS SEM FOREIGN KEY   --
CREATE TABLE Categorias(
	IdCategoria		INT PRIMARY KEY IDENTITY,
	NomeCategoria	VARCHAR(255) UNIQUE NOT NULL 
);
GO


CREATE TABLE Permissoes(
	IdPermissao		INT PRIMARY KEY IDENTITY,
	NomePermissao	VARCHAR(255) UNIQUE NOT NULL
);
GO


CREATE TABLE TiposLocais(
	IdTipoLocal		INT PRIMARY KEY IDENTITY,
	NomeTipolocal	VARCHAR(255) UNIQUE NOT NULL,
);
GO


CREATE TABLE Bairros(
	IdBairro		INT PRIMARY KEY IDENTITY,
	NomeBairro		VARCHAR(255) UNIQUE NOT NULL,
);
GO


CREATE TABLE Situacoes(
	IdSituacao		INT PRIMARY KEY IDENTITY,
	NomeSituacao	VARCHAR(255) UNIQUE NOT NULL,
	Descricao		TEXT NOT NULL,
);
GO


CREATE TABLE Eventos(
	IdEvento		INT PRIMARY KEY IDENTITY,
	NomeEvento		VARCHAR(255) NOT NULL,
	Descricao		TEXT NOT NULL,
	DataInicio		DATE NOT NULL,
	DataTermino		DATE NOT NULL,
);
GO

--   TABELAS COM FOREIGN KEY  --
CREATE TABLE Usuarios(
	IdUsuario		INT PRIMARY KEY IDENTITY,
	IdPermissao		INT FOREIGN KEY REFERENCES Permissoes(IdPermissao) NOT NULL,
	NomeUsuario		VARCHAR(255) NOT NULL,
	DataNascimento	DATE NOT NULL,
	Email			VARCHAR(255) UNIQUE NOT NULL,
	Senha			VARCHAR(200) NOT NULL,

	IdBairro		INT FOREIGN KEY REFERENCES Bairros(IdBairro),
	Cep				VARCHAR(9),
	Logradouro		VARCHAR(255),
	Numero			INT,
);
GO


CREATE TABLE Servicos(
	IdServico		INT PRIMARY KEY IDENTITY,
	IdCategoria		INT FOREIGN KEY REFERENCES Categorias(IdCategoria) NOT NULL,
	NomeServico		VARCHAR(255) NOT NULL
);
GO

CREATE TABLE Locais(
	IdLocal			INT PRIMARY KEY IDENTITY,
	IdTipoLocal		INT FOREIGN KEY REFERENCES TiposLocais(IdTipoLocal) NOT NULL,
	NomeLocal		VARCHAR(255) NOT NULL UNIQUE,
	Capacidade		INT,

	IdBairro		INT FOREIGN KEY REFERENCES Bairros(IdBairro) NOT NULL,
	Cep				VARCHAR(9) NOT NULL,
	Logradouro		VARCHAR(255) NOT NULL,
	Numero			INT NOT NULL,
);
GO

CREATE TABLE LocaisEventos(
	IdEvento		INT FOREIGN KEY REFERENCES Eventos(IdEvento) NOT NULL,
	IdLocal			INT FOREIGN KEY REFERENCES Locais(IdLocal) NOT NULL,
);
GO

CREATE TABLE ServicosPrestados (
	IdServico		INT FOREIGN KEY REFERENCES Servicos(IdServico) NOT NULL,
	IdLocal			INT FOREIGN KEY REFERENCES Locais(IdLocal) NOT NULL,
	IdSituacao		INT FOREIGN KEY REFERENCES Situacoes(IdSituacao) NOT NULL,
	Ativo			BIT NOT NULL DEFAULT(1),
	UltimaAtualizacao DATETIME NOT NULL 
);
GO
