using System;
using System.Collections.Generic;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public class LocaisEventos
    {
        public int IdEvento { get; set; }
        public virtual Eventos IdEventoNavigation { get; set; }

        public int IdLocal { get; set; }
        public virtual Locais IdLocalNavigation { get; set; }
    }
}