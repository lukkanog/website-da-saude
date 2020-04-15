using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface IPermissaoRepository
    {
        /// <summary>
        /// Lista todas as permissões existentes no banco de dados.
        /// </summary>
        /// <returns>Lista de pemissões</returns>
        List<Permissoes> Listar();
    }
}