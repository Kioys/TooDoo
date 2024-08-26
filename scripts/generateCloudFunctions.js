import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths relative to the project root
const projectRoot = path.resolve(__dirname, '..');  // Ajusta el número de '..' según sea necesario para llegar a la raíz del proyecto

const headerFilePath = path.join(projectRoot, 'cloud', 'headers.js');
const srcDirectoryPath = path.join(projectRoot, 'cloud', 'src');
const outputFilePath = path.join(projectRoot, 'src', 'cloud', 'functions.js');

// Function to read a file
const readFile = async (filePath) => {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        throw new Error(`Error reading file ${filePath}: ${error.message}`);
    }
};

// Function to get all files in a directory
const getFilesInDirectory = async (dirPath) => {
    try {
        const files = await fs.readdir(dirPath);
        return files.filter(file => file.endsWith('.js'));
    } catch (error) {
        throw new Error(`Error reading directory ${dirPath}: ${error.message}`);
    }
};

// Function to combine contents of files
const combineFiles = async () => {
    try {
        // Read header file
        const headerContent = await readFile(headerFilePath);

        // Get all JS files in src directory
        const srcFiles = await getFilesInDirectory(srcDirectoryPath);

        // Read content of each src file
        const srcContents = await Promise.all(
            srcFiles.map(file => readFile(path.join(srcDirectoryPath, file)))
        );

        // Combine header content with src contents
        const combinedContent = [headerContent, ...srcContents].join('\n');

        // Write combined content to output file
        await fs.writeFile(outputFilePath, combinedContent, 'utf8');
        console.log('File created successfully:', outputFilePath);
    } catch (error) {
        console.error('Error combining files:', error.message);
    }
};

// Execute the combineFiles function
combineFiles();
