using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Locais
    {
        public int IdLocal { get; set; }

        [Required(ErrorMessage = "Informe o tipo do local.")]
        public int IdTipoLocal { get; set; }

        [Required(ErrorMessage = "Informe o nome do local.")]
        [StringLength(255, MinimumLength = 5,ErrorMessage = "O nome do local deve ter no mínimo 5 caracteres, e no máximo 255 caracteres.")]
        public string NomeLocal { get; set; }
        public int? Capacidade { get; set; }

        [Required(ErrorMessage = "Informe o bairro do local")]
        public int IdBairro { get; set; }

        [Required(ErrorMessage = "Informe o CEP do local.")]
        public string Cep { get; set; }

        [Required(ErrorMessage = "Informe o logradouro do local.")]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "Informe o número do local.")]
        public int Numero { get; set; }

        public virtual Bairros IdBairroNavigation { get; set; }
        public virtual TiposLocais IdTipoLocalNavigation { get; set; }

        public virtual List<LocaisEventos> LocaisEventos { get; set; }
        public virtual List<ServicosPrestados> ServicosPrestados { get; set; }
    }
}
