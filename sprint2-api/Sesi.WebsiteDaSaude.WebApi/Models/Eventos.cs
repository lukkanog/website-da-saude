using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Eventos
    {
        public int IdEvento { get; set; }
        
        [Required(ErrorMessage = "Insira o nome do evento.")]
        public string NomeEvento { get; set; }

        [Required(ErrorMessage = "Insira uma descrição para o evento.")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "O evento deve ter uma data de início")]
        public DateTime DataInicio { get; set; }

        [Required(ErrorMessage = "O evento deve ter uma data de término")]
        public DateTime DataTermino { get; set; }

        public virtual List<LocaisEventos> LocaisEventos { get; set; }

    }
}
