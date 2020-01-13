using System.Collections.Generic;
using Sesi.WebsiteDaSaude.WebApi.Models;

namespace Sesi.WebsiteDaSaude.WebApi.Interfaces
{
    public interface ILocalEventoRepository
    {
        List<LocaisEventos> Listar();

        List<Eventos> BuscarEventosDeLocal(int idLocal);

        List<Locais> BuscarLocaisDeEvento(int idEvento);

        void Cadastrar(LocaisEventos localEvento);

        void Excluir(LocaisEventos localEvento);
    }
}