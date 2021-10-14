## 11.1 Numeric Data Types

MySQL supports all standard SQL numeric data types. These types include the exact numeric data types ([`INTEGER`](integer-types.md), [`SMALLINT`](integer-types.md), [`DECIMAL`](fixed-point-types.md), and [`NUMERIC`](fixed-point-types.md)), as well as the approximate numeric data types ([`FLOAT`](floating-point-types.md), [`REAL`](floating-point-types.md), and [`DOUBLE PRECISION`](floating-point-types.md)). The keyword [`INT`](integer-types.md) is a synonym for [`INTEGER`](integer-types.md), and the keywords [`DEC`](fixed-point-types.md) and [`FIXED`](fixed-point-types.md) are synonyms for [`DECIMAL`](fixed-point-types.md). MySQL treats [`DOUBLE`](floating-point-types.md) as a synonym for [`DOUBLE PRECISION`](floating-point-types.md) (a nonstandard extension). MySQL also treats [`REAL`](floating-point-types.md) as a synonym for [`DOUBLE PRECISION`](floating-point-types.md) (a nonstandard variation), unless the [`REAL_AS_FLOAT`](sql-mode.md#sqlmode_real_as_float) SQL mode is enabled.

The [`BIT`](bit-type.md) data type stores bit values and is supported for [`MyISAM`](myisam-storage-engine.md), [`MEMORY`](memory-storage-engine.md), [`InnoDB`](innodb-storage-engine.md), and [`NDB`](mysql-cluster.md) tables.

For information about how MySQL handles assignment of out-of-range values to columns and overflow during expression evaluation, see [Section 11.1.7, “Out-of-Range and Overflow Handling”](out-of-range-and-overflow.md).

For information about storage requirements of the numeric data types, see [Section 11.7, “Data Type Storage Requirements”](storage-requirements.md).

For descriptions of functions that operate on numeric values, see [Section 12.6, “Numeric Functions and Operators”](numeric-functions.md). The data type used for the result of a calculation on numeric operands depends on the types of the operands and the operations performed on them. For more information, see [Section 12.6.1, “Arithmetic Operators”](arithmetic-functions.md).

