﻿using System;
using System.Collections.Generic;
using System.Text;

namespace filmHive.Model.Request
{
    public class RoleInsertRequest
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public bool IsActive { get; set; }

    }
}
