function checkfunc(id)
{
    let n=parseInt(document.getElementById(id).value);

    if(n==0||n>9)
    {
        window.alert("Input between 1 and 9");
        document.getElementById(id).value="";
    }
}

function resetfunc()
{
    let i,j,s;
    for(i=0;i<9;i++)
    {
        for(j=0;j<9;j++)
        {
            s=i.toString()+j.toString();
            document.getElementById(s).value="";
        }
    }
}

function check(a,n,r,c,x)
{
    let i,j;
    for(i=0;i<n;i++)
    {
        if(a[r][i]==x)
            return false;
    }
    for(i=0;i<n;i++)
    {
        if(a[i][c]==x)
            return false;
    }
    r=Math.floor((r/3))*3;
    c=Math.floor((c/3))*3;
    for(i=r;i<r+3;i++)
    {
        for(j=c;j<c+3;j++)
        {
            if(a[i][j]==x)
                return false;
        }
    }
    return true;
}

function solve(a,n,r,c)
{
    if(r==n)
        return true;
    else if(c==n)
    {
        return solve(a,n,r+1,0);
    }
    else
    {
        if(a[r][c])
            return solve(a,n,r,c+1);
        else
        {
            let i;
            for(i=1;i<=n;i++)
            {
                if(check(a,n,r,c,i))
                {
                    a[r][c]=i;
                    if(solve(a,n,r,c+1))
                        return true;
                    else
                        a[r][c]=0;
                }
            }
            return false;
        }
    }
}

function checkbefore(a,n)
{
    let i,j,k,l;
    var f=new Array(10);
    for(i=0;i<10;i++)
        f[i]=0;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
            if(f[a[i][j]])
                return false;
            if(a[i][j])
                f[a[i][j]]=1;   
        }
        for(j=0;j<10;j++)
            f[j]=0; 
    }
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
            if(f[a[j][i]])
                return false;
            if(a[j][i])
                f[a[j][i]]=1;
        }
        for(j=0;j<10;j++)
            f[j]=0; 
    }
    for(i=0;i<n;i+=3)
    {
        for(j=0;j<n;j+=3)
        {
            for(k=i;k<i+3;k++)
            {
                for(l=j;l<j+3;l++)
                {
                    if(f[a[k][l]])
                        return false;
                    if(a[k][l])
                        f[a[k][l]]=1;
                }
            }
            for(k=0;k<10;k++)
                f[k]=0; 
        }
    }
    return true;
}

function solvefunc()
{
    let i,j,n=9,x;
    let a=new Array(9);
    for(i=0;i<n;i++)
        a[i]=new Array(9);
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
            x=document.getElementById(i.toString()+j.toString()).value;
            if(x=="")
                a[i][j]=0;
            else
                a[i][j]=parseInt(x);
        }
    }
    if(!checkbefore(a,n))
        document.getElementById("unsol").style.display="block";
    else
    {
        if(solve(a,n,0,0))
        {
            for(i=0;i<n;i++)
            {
                for(j=0;j<n;j++)
                {
                    document.getElementById(i.toString()+j.toString()).value=a[i][j];
                }
            }
        }
    }
}
function unsol()
{
    document.getElementById("unsol").style.display="none";
}