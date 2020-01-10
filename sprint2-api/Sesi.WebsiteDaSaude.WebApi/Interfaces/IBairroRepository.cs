using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface IBairroRepository
    {
        /// <summary>
        /// Lista todos os bairros cadastrados no banco de dados
        /// </summary>
        /// <returns>Lista de bairros</returns>
        List<Bairros> Listar();

        /// <summary>
        /// Busca um bairro de acordo com seu id
        /// </summary>
        /// <param name="id">id do bairro procurado</param>
        /// <returns>Bairro com aquele id ou nulo caso o mesmo não seja encontrado</returns>
        Bairros BuscarPorId(int id);

        /// <summary>
        /// Lista todos os bairros e inclui os locais de cada um
        /// </summary>
        /// <returns>Lista de bairros incluindo seus respectivos locais cadastrados</returns>
        List<Bairros> ListarLocais();

        /// <summary>
        /// Lista todos os bairros que se assemelham com o nome passado
        /// </summary>
        /// <param name="nomeBairro">nome do bairro procurado</param>
        /// <returns>Lista de bairros com os nomes semelhantes ao passado como parâmetro</returns>
        List<Bairros> BuscarPorNome(string nomeBairro);
    }
}