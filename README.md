<p align="center">
  <img src="./src/assets/svg/LOGO.svg" alt="SiPEDAGANG Logo" width="180"/>
</p>

<h1 align="center">PROJECT FRONTEND SiPEDAGANG</h1>

<p align="center">
  <b>SiPEDAGANG</b> (Sistem Pengadaan Beras dan Gabah) adalah sistem informasi yang dikembangkan untuk mendukung proses pengadaan beras dan gabah oleh <b>Perum BULOG</b> secara digital dan terintegrasi.<br>
  Sistem ini bertujuan untuk memfasilitasi pencatatan data pembelian gabah dan beras dari petani atau mitra secara efisien, transparan, dan akuntabel.
</p>

---

## Database Integration Update (May 2025)

This update includes several important improvements to the Sipedagang frontend application to ensure proper integration with the Laravel backend API.

### Key Improvements

1. **Database Schema Update**
   - Added `satuan` column to the `pengadaan` table
   - Added appropriate indexes for better performance
   - See `DATABASE_UPDATE_README.md` for details

2. **Form Validation and Field Naming**
   - Updated form field names to match API expectations
   - Fixed validation logic to match Laravel validation rules
   - Added robust error handling for different error scenarios

3. **Data Structure for Form Submissions**
   - Fixed `in_data` format to match expected JSON structure
   - Added consistent satuan (unit) handling across forms
   - Added null checks to prevent JSON errors

### Files to Use for Database Update

1. **SQL Files:**
   - `add_satuan_migration.sql` - Raw SQL for direct database update
   - `sipedagang.sql` - Complete updated database schema

2. **Migration Scripts:**
   - `apply_migration.sh` - Bash script for Linux/Mac
   - `apply_migration.ps1` - PowerShell script for Windows
   - `add_satuan_to_pengadaan_table.php` - Laravel migration file

3. **Documentation:**
   - `database_migration_instructions.md` - Step-by-step migration guide
   - `API_INTEGRATION_GUIDE.md` - Comprehensive API documentation

### How to Apply This Update

1. **Database Update:**
   - Run the appropriate migration script for your environment
   - Verify the `satuan` column was added to the `pengadaan` table

2. **Frontend Application:**
   - All necessary code changes have already been applied
   - The application now correctly handles the satuan field
   - JSON data will be properly formatted for the backend

For detailed information, please refer to the documentation files.

---