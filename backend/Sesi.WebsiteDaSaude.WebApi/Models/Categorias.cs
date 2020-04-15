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

        [Required(ErrorMessage = "Informe o nome da categoria.")]
        [StringLength(255, MinimumLength = 2,ErrorMessage = "O nome da categoria deve ter no mínimo dois caracteres e no máximo 255 caracteres.")]
        public string NomeCategoria { get; set; }

        public virtual ICollection<Servicos> Servicos { get; set; }
    }
}
