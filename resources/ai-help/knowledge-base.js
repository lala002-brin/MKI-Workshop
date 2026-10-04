const knowledgeBase = {


    convergence: {

        title:
        "SCF Convergence Problem",

        category:
        "Quantum ESPRESSO",

        solution: `

Check the following:

<br>

1. Increase electron_maxstep

<br>

2. Review mixing_beta

<br>

3. Check cutoff energy

<br>

4. Verify initial structure

`

    },



    pseudopotential: {

        title:
        "Missing Pseudopotential",

        category:
        "Quantum ESPRESSO",

        solution: `

Check:

<br>

1. UPF file availability

<br>

2. pseudo_dir path

<br>

3. Filename in input file

`

    },



    permission: {

        title:
        "Linux Permission Error",

        category:
        "Linux",

        solution: `

Check file permission:

<br><br>

<pre>
ls -lh
</pre>

`

    }

};
