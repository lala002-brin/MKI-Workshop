#!/bin/bash


echo "================================="
echo " Graphene QE Workflow "
echo "================================="


echo ""
echo "Step 1: Submit SCF calculation"

bash scripts/submit_qe.sh graphene_scf


echo ""
echo "After SCF completion, continue with:"
echo "bash scripts/submit_qe.sh graphene_nscf"


echo ""
echo "After NSCF completion, continue with:"
echo "bash scripts/submit_post.sh graphene_dos dos.x"


echo ""
echo "Band calculation:"
echo "bash scripts/submit_qe.sh graphene_bands"


echo ""
echo "Band post processing:"
echo "bash scripts/submit_post.sh graphene_bands_pp bands.x"


echo ""
echo "Workflow instructions completed"
