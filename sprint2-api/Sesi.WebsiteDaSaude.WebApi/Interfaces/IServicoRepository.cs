using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface IServicoRepository
    {
        /// <summary>
        /// Lista todos os serviços existentes no banco de dados.
        /// </summary>
        /// <returns>Lista de serviços.</returns>
        List<Servicos> Listar();

        /// <summary>
        /// Busca um serviço que tenha o mesmo id que o passado. 
        /// </summary>
        /// <param name="id">Id do serviço procurado.</param>
        /// <returns>Serviço com o id procurado ou nulo caso ou mesmo não seja encontrado.</returns>
        Servicos BuscarPorId(int id);

        /// <summary>
        /// Busca o(s) serviço(s) que tenham o nome procurado passado como parâmetro
        /// </summary>
        /// <param name="nomeServico">Nome do serviço procurado</param>
        /// <returns>Lista de serviços</returns>
        List<Servicos> BuscarPorNome(string nomeServico);

        /// <summary>
        /// Cadastra um novo serviço no banco de dados. 
        /// </summary>
        /// <param name="servico">Serviço a ser cadastrado.</param>
        void Cadastrar(Servicos servico);

        /// <summary>
        /// Edita as informações de determinado serviço.
        /// </summary>
        /// <param name="servico">Serviço com as alterações feitas.</param>
        void Editar(Servicos servicoPassado);

        /// <summary>
        /// Exclui um serviço determinado pelo seu id.
        /// </summary>
        /// <param name="id">Id do serviço a ser excluído.</param>
        void Excluir(int id);
    }
}