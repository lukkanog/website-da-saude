using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface ILocalRepository
    {
        /// <summary>
        /// Lista todos os locais existentes no banco de dados.
        /// </summary>
        /// <returns>Lista de locais.</returns>
        List<Locais> Listar();

        /// <summary>
        /// Lista todos os locais que tenham certo tipo de local.
        /// </summary>
        /// <param name="idTipoLocal">Id do tipo de local procurado.</param>
        /// <returns>Lista de locais que tenham o determinado tipo.</returns>
        List<Locais> ListarPorTipoDeLocal(int idTipoLocal);

        /// <summary>
        /// Lista todos os locais de determinado bairro.
        /// </summary>
        /// <param name="idBairro">Id do bairro procurado.</param>
        /// <returns>Lista de locais que são do determinado bairro.</returns>
        List<Locais> ListarPorBairro(int idBairro);

        /// <summary>
        /// Busca um local através de seu id.
        /// </summary>
        /// <param name="id">Id do local procurado</param>
        /// <returns>Local com o id passado ou nulo caso esse não seja encontrado.</returns>
        Locais BuscarPorId(int id);

        /// <summary>
        /// Cadastra um novo local no banco de dados.
        /// </summary>
        /// <param name="local">Local a ser cadastrado</param>
        void Cadastrar(Locais local);

        /// <summary>
        /// Edita as informações de um local.
        /// </summary>
        /// <param name="local">Local com as alterações feitas.</param>
        void Editar(Locais local);

        /// <summary>
        /// Exclui um local do banco de dados.
        /// </summary>
        /// <param name="id">Id do local a ser excluído.</param>
        void Excluir(int id);
    }
}