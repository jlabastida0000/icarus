// src/storage/mod.rs

pub trait StorageInterface {
    fn save(&self, data: &[u8], path: &str) -> Result<(), String>;
    fn load(&self, path: &str) -> Result<Vec<u8>, String>;
}

pub mod local;
pub mod cloud;

