// src/storage/local.rs

use super::StorageInterface;

pub struct LocalFileSystem;

impl StorageInterface for LocalFileSystem {
    fn save(&self, data: &[u8], path: &str) -> Result<(), String> {
        // Implement local file system save logic
        Ok(())
    }

    fn load(&self, path: &str) -> Result<Vec<u8>, String> {
        // Implement local file system load logic
        Ok(Vec::new())
    }
}
