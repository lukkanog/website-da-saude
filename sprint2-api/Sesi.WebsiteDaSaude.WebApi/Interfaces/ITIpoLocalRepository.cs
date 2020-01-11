using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface ITIpoLocalRepository
    {
        /// <summary>
        /// Lista todos os tipos de locais existentes no banco de dados.
        /// </summary>
        /// <returns>Lista de tipos de locais</returns>
        List<TiposLocais> Listar();

        // /// <summary>
        // /// Cadastra um novo tipo de local no banco de dados
        // /// </summary>
        // /// <param name="tipo">Tipo de local a ser cadastrado.</param>
        // void Cadastrar(TiposLocais tipo);

        // /// <summary>
        // /// Exclui um tipo de local determinado pelo id passado
        // /// </summary>
        // /// <param name="id">Id do tipo a ser excluído.</param>
        // void Excluir(int id);
    }
}