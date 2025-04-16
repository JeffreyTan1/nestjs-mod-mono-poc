#!/usr/bin/env ts-node
import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

// Configuration
const MIGRATIONS_DIR = path.resolve(
  __dirname,
  '../src/common/database/migrations',
);
const DATASOURCE_PATH = path.resolve(
  __dirname,
  '../src/common/database/typeorm-datasource.ts',
);

// Ensure migrations directory exists
if (!fs.existsSync(MIGRATIONS_DIR)) {
  fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
}

// Main function to run specified command
async function main() {
  const command = process.argv[2];
  const migrationName = process.argv[3];

  if (!command) {
    console.error('No command specified. Available commands:');
    console.error('- generate <migration-name>: Generate a new migration');
    console.error('- create <migration-name>: Create a blank migration');
    console.error('- run: Run all pending migrations');
    console.error('- revert: Revert the most recent migration');
    process.exit(1);
  }

  if ((command === 'generate' || command === 'create') && !migrationName) {
    console.error(
      'Migration name is required for generate and create commands.',
    );
    process.exit(1);
  }

  try {
    switch (command) {
      case 'generate':
        await runTypeOrmCommand('migration:generate', migrationName);
        break;
      case 'create':
        await runTypeOrmCommand('migration:create', migrationName);
        break;
      case 'run':
        await runTypeOrmCommand('migration:run');
        break;
      case 'revert':
        await runTypeOrmCommand('migration:revert');
        break;
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error(
      'Error executing command:',
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  }
}

// Run TypeORM CLI command
async function runTypeOrmCommand(
  typeormCommand: string,
  migrationName?: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const args: string[] = [];

    // Add the typeorm command
    args.push(typeormCommand);

    // For generate and create commands, add the migration path with name
    if (migrationName) {
      const formattedName = formatMigrationName(migrationName);
      args.push(`${MIGRATIONS_DIR}/${formattedName}`);
    }

    // Add datasource for commands that need it
    if (typeormCommand !== 'migration:create') {
      args.push('-d');
      args.push(DATASOURCE_PATH);
    }

    console.log(`Running: typeorm-ts-node-commonjs ${args.join(' ')}`);

    const childProcess = spawn('npx', ['typeorm-ts-node-commonjs', ...args], {
      stdio: 'inherit',
      shell: true,
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    childProcess.on('error', (err) => {
      reject(err);
    });
  });
}

// Format migration name to ensure consistency
function formatMigrationName(name: string): string {
  // Convert spaces to hyphens and ensure lowercase
  const formattedName = name.trim().replace(/\s+/g, '-').toLowerCase();

  return formattedName;
}

// Run the main function
main().catch((error) => {
  console.error(
    'Unhandled error:',
    error instanceof Error ? error.message : String(error),
  );
  process.exit(1);
});
