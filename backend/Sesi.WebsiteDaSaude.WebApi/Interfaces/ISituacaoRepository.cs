
using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface ISituacaoRepository
    {
        /// <summary>
        /// Lista todas as situações que os Serviços podem apresentar.
        /// </summary>
        /// <returns>Lista de situações</returns>
        List<Situacoes> Listar();

        
    }
}