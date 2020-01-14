using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public class LocaisEventos
    {
        [Required(ErrorMessage = "Informe o evento a ser vinculado.")]
        public int IdEvento { get; set; }
        public virtual Eventos IdEventoNavigation { get; set; }

        [Required(ErrorMessage = "Informe o local a ser vinculado ao evento.")]
        public int IdLocal { get; set; }
        public virtual Locais IdLocalNavigation { get; set; }
    }
}