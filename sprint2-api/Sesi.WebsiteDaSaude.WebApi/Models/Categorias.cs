using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sesi.WebsiteDaSaude.WebApi.Models
{
    public partial class Categorias
    {
        public Categorias()
        {
            Servicos = new HashSet<Servicos>();
        }

        public int IdCategoria { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string NomeCategoria { get; set; }

        public virtual ICollection<Servicos> Servicos { get; set; }
    }
}
