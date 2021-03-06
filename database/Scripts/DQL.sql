USE WebsiteDaSaude

SELECT * FROM Permissoes

SELECT * FROM Categorias

SELECT * FROM TiposLocais

SELECT * FROM Bairros

SELECT * FROM Situacoes

SELECT * FROM Eventos

SELECT * FROM Usuarios

SELECT * FROM Servicos

SELECT * FROM Locais

SELECT * FROM LocaisEventos

SELECT * FROM ServicosPrestados





CREATE VIEW vwUsuarios
AS
	SELECT U.*,P.NomePermissao,B.NomeBairro
	FROM Usuarios U
	INNER JOIN Permissoes P
	ON U.IdPermissao = P.IdPermissao
	INNER JOIN Bairros B
	ON U.IdBairro = B.IdBairro

SELECT * FROM vwUsuarios


CREATE VIEW vwLocais
AS
	SELECT T.NomeTipoLocal,L.*,B.NomeBairro
	FROM Locais L
	INNER JOIN TiposLocais T
	ON L.IdTipoLocal = T.IdTipoLocal
	INNER JOIN Bairros B
	ON L.IdBairro = B.IdBairro


SELECT * FROM vwLocais

CREATE VIEW vwServicos
AS
	SELECT S.*,C.NomeCategoria
	FROM Servicos S
	INNER JOIN Categorias C
	ON S.IdCategoria = C.IdCategoria

SELECT * FROM ServicosPrestados


CREATE VIEW vwServicosCompletos
AS
	SELECT vwServicos.*, vwLocais.*, Situacoes.*,SP.Ativo,SP.UltimaAtualizacao
	FROM ServicosPrestados SP
	INNER JOIN vwServicos
	ON SP.IdServico = vwServicos.IdServico
	INNER JOIN vwLocais
	ON SP.IdLocal = vwLocais.IdLocal
	INNER JOIN Situacoes
	ON SP.IdSituacao = Situacoes.IdSituacao

SELECT * FROM vwServicosCompletos

CREATE PROC ProcurarPorEmailESenha @Email VARCHAR(255), @Senha VARCHAR(255)
AS
	SELECT * FROM vwUsuarios
	WHERE Email = @Email AND Senha = @Senha

EXEC ProcurarPorEmailESenha 'fulano@email.com','123123'


CREATE PROC ListarServicoESeusLocais @ServicoProcurado VARCHAR(255)
AS
	SELECT * FROM vwServicosCompletos
	WHERE NomeServico LIKE ('%' + @ServicoProcurado + '%')


EXEC ListarServicoESeusLocais 'pro'