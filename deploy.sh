aws s3 rm s3://bimcar --recursive
aws s3 sync build s3://disorder-ai
# aws s3 cp build/asset-manifest.json s3://bimcar 
# aws s3 cp build/manifest.json s3://bimcar 
# aws s3 cp build/robots.txt s3://bimcar 
# aws s3 cp build/images s3://bimcar --recursive
# aws s3 cp build/static s3://bimcar --recursive
