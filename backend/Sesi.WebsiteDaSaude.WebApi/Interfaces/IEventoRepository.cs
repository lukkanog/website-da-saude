using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface IEventoRepository
    {
        /// <summary>
        /// Lista todos os eventos cadastrados no banco de dados.
        /// </summary>
        /// <returns>Lista de eventos</returns>
        List<Eventos> Listar();

        /// <summary>
        /// Lista todos os eventos cadastrados no banco de dados junto com seus objetos LocaisEventos que permite ligar os locais aos eventos.
        /// </summary>
        /// <returns>Lista de eventos com seus objetos LocaisEventos</returns>
        List<Eventos> ListarLocais();

        /// <summary>
        /// Busca um evento de acordo com seu id.
        /// </summary>
        /// <param name="id">Id do evento procurado.</param>
        /// <returns>Evento com o id passado ou nulo caso o mesmo não seja encontrado.</returns>
        Eventos BuscarPorId(int id);

        /// <summary>
        /// Cadastra um novo evento no banco de dados.
        /// </summary>
        /// <param name="evento">Evento a ser cadastrado</param>
        void Cadastrar(Eventos evento);

        /// <summary>
        /// Edita as informações de um evento.
        /// </summary>
        /// <param name="eventoPassado">Evento com as alterações feitas.</param>
        void Editar(Eventos eventoPassado);

        /// <summary>
        /// Exclui o evento determinado pelo id passado como parâmetro.
        /// </summary>
        /// <param name="id">Id do evento a ser excluído.</param>
        void Excluir(int id);

    }
}