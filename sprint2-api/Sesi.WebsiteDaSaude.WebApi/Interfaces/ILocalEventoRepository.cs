using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface ILocalEventoRepository
    {
        /// <summary>
        /// Lista todos os vínculos de local e evento existentes no banco de dados.
        /// </summary>
        /// <returns>Lista de vínculos entre local e evento</returns>
        List<LocaisEventos> Listar();

        /// <summary>
        /// Lista todos os eventos que acontecem em um determinado local.
        /// </summary>
        /// <param name="idLocal">Id do local procurado</param>
        /// <returns>Lista de eventos</returns>
        List<Eventos> BuscarEventosDeLocal(int idLocal);

        /// <summary>
        /// Lista todos os locais onde acontecem um determinado evento
        /// </summary>
        /// <param name="idEvento">Id do evento procurado</param>
        /// <returns>Lista de locais.</returns>
        List<Locais> BuscarLocaisDeEvento(int idEvento);

        /// <summary>
        /// Cadastra um novo vínculo entre evento e local.
        /// </summary>
        /// <param name="localEvento">Objeto com o id do evento e o id do local a serem vinculados.</param>
        void Cadastrar(LocaisEventos localEvento);
        
        /// <summary>
        /// Exclui um vínculo entre local e evento.
        /// </summary>
        /// <param name="localEvento">Objeto com o id do evento e o id do local a serem excluídos.</param>
        void Excluir(LocaisEventos localEvento);
    }
}