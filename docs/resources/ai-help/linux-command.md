# 💻 Linux Command Assistant


## Terminal Quick Guide


Computational materials simulations are commonly
performed in Linux environments.


This guide provides essential commands for
managing files and checking simulation results.



---

## File Navigation


### Check Current Directory


Find your current location:


```bash
pwd
```
---

### List Files


Show files and folders inside the current directory:


```bash
ls
```


Show detailed information:


```bash
ls -lh
```


Show hidden files:


```bash
ls -a
```



---


### Move Between Directories


Enter a folder:


```bash
cd folder_name
```


Example:


```bash
cd graphene
```


Return to the previous directory:


```bash
cd ..
```
---

## File Management


### Create New Folder


Create a new directory:


```bash
mkdir folder_name
```


Example:


```bash
mkdir calculation
```



---


### Copy Files


Copy a file:


```bash
cp source_file destination
```


Example:


```bash
cp scf.in backup/
```



---


### Rename or Move Files


Rename a file:


```bash
mv old_name new_name
```


Example:


```bash
mv input_old.in input.in
```



Move a file to another folder:


```bash
mv file_name folder/
```
---

## Checking Simulation Output


Simulation calculations usually generate
large output files.


These commands help monitor
calculation progress and identify problems.



---


### Read Output File


Display file content:


```bash
cat output_file
```


Example:


```bash
cat scf.out
```



---


### Monitor Calculation Progress


Show the latest lines of an output file:


```bash
tail -50 output_file
```


Example:


```bash
tail -50 scf.out
```



---


### Search Information


Find specific text inside a file:


```bash
grep keyword filename
```


Example:


```bash
grep "!" scf.out
```
---

## Quick Command Summary


| Command | Function |
|---|---|
| pwd | Show current directory |
| ls | List files and folders |
| cd | Move between directories |
| mkdir | Create new folder |
| cp | Copy files |
| mv | Move or rename files |
| cat | Read file content |
| tail | Monitor output files |
| grep | Search information |



---


## Simulation Workflow Checklist


Before running a calculation:


```text
✓ Working directory is correct

✓ Input file is available

✓ Required files are prepared

✓ Calculation command is correct

✓ Output file is monitored
```



---


## Need AI Help?


When asking AI for troubleshooting,
provide:


```text
Software:

Command executed:

Working directory:

Error message:

Output file:

Expected result:
```


Complete information helps
identify problems faster.
